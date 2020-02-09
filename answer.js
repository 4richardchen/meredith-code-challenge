const http = require("http");
const moment = require("moment");
const express = require("express");
const express_app = express();
const port = 8000;
let answer;

//initializing data as seen at challenge site
const base_url = "http://codechallenge.meredith.com" //no trailing slash
let command = new Object();
command.url = base_url + "/code-challenge/firststep/?auth=dT/ppozhl094XvDwxUArVcXgovsHNvHe6Of/Y5ioLcw%3D"; //from challenge site
command.operations_remaining = true;

//each iteration represents 1 operation in the challenge
let step = function (command) {
	let promise = new Promise(function(resolve, reject) {
		http.get(command.url, (response) => {
			response.setEncoding("utf8")
		    response.on("data", (buffer) => {
		        resolve(buffer.toString());
		    });
		}).on("error", (error) => {
		    reject(error);
		});
	});
	promise.then(
		//resolve
		function(body) {
		    try {
		        command.parsed = JSON.parse(body);
		        console.log('command = ', command)
		        command.operations_remaining = command.parsed.operations_remaining
			    if(command.operations_remaining) {
			        switch(command.parsed.operation) {
			            case "next_fibonacci_number":
			                command.answer = command.parsed.arguments.slice(-2).reduce((a, b) => a + b, 0); //get next in seq, sum of last 2 vals
			                break;
			            case "addition":
			                command.answer = command.parsed.arguments.reduce((a, b) => a + b, 0); //sum whole array
			                break;
			            case "multiplication":
			                command.answer = command.parsed.arguments.reduce((a, b) => a * b); //multiply whole array
			                break;
			            case "date_addition":
							command.answer = moment(command.parsed.arguments[0]).add(command.parsed.arguments[1].replace(/\D/g, ""), command.parsed.arguments[1].replace(/[^a-z]/g, "")).unix()
			                break;
			            default:
			                console.error("Unhandled operation: " + command.parsed.operation);
			                break;
			        }
			        command.url = base_url + command.parsed.next_endpoint.replace("{your solution}", command.answer);
			    	step(command)
			    }
			    else {
			    	if(command.parsed.error) { console.error(command.parsed.error) }
			    	else {
			    		answer = command.parsed.secret_message
			    		console.info("Answer: " + answer);
			    		//send answer to browser
						express_app.get("/code-challenge", (request, response) => response.send(answer));
						express_app.listen(port, () => console.info(`View host's http://localhost:${port}/code-challenge for the answer.`)); //todo: display at end of execution
			    		return true;
			    	}
			    }
			}
			catch(error) { //catch any/all errors in resolve
		        console.error(error);
		    }
	    },
	    //reject
	    function(result) {
	    	console.error(result);
		}
	)
	return false;
}

//init
step(command)