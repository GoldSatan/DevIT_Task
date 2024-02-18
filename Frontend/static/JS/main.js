/*~~~ request to Flask function ~~~*/
const RequestToBackend = () => {
    const concurrencyLimit = parseInt(document.getElementById("concurrencyInput").value);
    const requestsPerSecond = parseInt(document.getElementById("requestsPerSecondInput").value);
    const totalRequests = 1000;

	const resultContainer = document.getElementById("resultContainer");

    const sendRequest = async (index) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/requests', {
                method: 'POST',
                body: JSON.stringify({ requestsPerSecond: requestsPerSecond, index: index }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const responseData = await response.json();
            console.log(`Response received for request ${index}: ${responseData['index']}`);

			const listItem = document.createElement('li');
            listItem.textContent = `Response received for request ${index}: ${responseData['index']}`;
            resultContainer.appendChild(listItem);
        } catch (error) {
            console.error(`Error occurred while sending request ${index}: ${error}`);
        }
    };

    const startSendingRequests = async () => {
		let requestIndex = 1;
		let currentRequestIndex = 0; 

		while (requestIndex <= totalRequests) {
			sendRequest(requestIndex);
	
			const delayMilliseconds = 1000 / requestsPerSecond;
			await new Promise(resolve => setTimeout(resolve, delayMilliseconds));
	
			requestIndex++;
			currentRequestIndex++;
	
			while (requestIndex - currentRequestIndex >= concurrencyLimit) {
				await new Promise(resolve => setTimeout(resolve, 100));
			}
		}
	};
	

    startSendingRequests();
};

/*~~~ disable btn function ~~~*/
const DisableSubmitButton = () => {
	var sumbitButton = document.querySelector('.btn-sub');
	var spanInButton = document.querySelectorAll('.btn-sub span');

	sumbitButton.style = 'cursor: not-allowed !important; color: #bababa !important;';
	submitButton.style.hover += `background: #1e5254 !important; box-shadow: 0 0 5px #757979, 0 0 25px #5f6e6e, 0 0 50px #5f6c6c, 0 0 100px #77898a !important;`
	spanInButton.forEach(span => {
		span.style = 'background: linear-gradient(180deg, transparent, #bababa) !important;';
	});

	/*~~~ move container ~~~*/
	document.querySelector('.main-content').style = 'right: calc(200px + 50%); left: inherit; transform: translateY(-50%);';
	document.querySelector('.result').style = 'opacity: 1; left: calc(200px + 50%);	transform: translateY(-50%);';

}

/*~~~ connect functions to button ~~~*/
document.addEventListener("DOMContentLoaded", function() {
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function(event) {
        event.preventDefault(); 

        var fields = document.querySelectorAll("input[required], textarea[required]");

        var isValid = true;
        fields.forEach(function(field) {
            if (!field.checkValidity()) {
                isValid = false;
                field.reportValidity();
            }
        });


        if (isValid) {
			submitButton.disabled = true;
			console.info('All data input. Request to rest')
            DisableSubmitButton();
			RequestToBackend();
        }
    });
});