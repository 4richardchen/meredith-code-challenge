# Meredith Corporation Code Challenge
Run my answer to the [Meredith Corporation Code Challenge](http://codechallenge.meredith.com/user/40/code-challenge-instructions) (assumes you've [Docker](https://hub.docker.com/?overlay=onboarding) installed on host machine):
```sh
git clone git@github.com:4richardchen/meredith-code-challenge
docker build -t meredith-code-challenge .
docker run -d -it -p 8000:8000 meredith-code-challenge
docker start `docker ps -q -n1` #seems to be 1-time only
docker exec -it `docker ps -q -n1` bash
node answer.js

#if you want to mount folders to live edit code
docker run -d -it -p 8000:8000 -v .:/home `docker images 4richardchen/meredith-code-challenge -q`
```

Then go to <http://localhost:8000/code-challenge> to see the answer. log.txt logs every step of execution.

# Q&A
Instructions given are only to view [this url](http://codechallenge.meredith.com/code-challenge/firststep/?auth=dT/ppozhl094XvDwxUArVcXgovsHNvHe6Of/Y5ioLcw%3D) and determine an answer.

Its response is
```json
{"next_endpoint":"\/code-challenge\/{your solution}\/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=zoZpkskvb19V4fKCNNjEXUfucDeqgy3az5VnsKZ3hwnDiZKEvFeLxaS7hQxPpVimUW4t3%2BoHzsUfteTQpqIO7mjmny4UELjgE%2BKHhf765FA%3D","operation":"next_fibonacci_number","arguments":[0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181],"operations_remaining":18}
```
The next number is 6765 so I tried [this url](http://codechallenge.meredith.com/code-challenge/6765/?auth=dT/ppozhl094XvDwxUArVcXgovsHNvHe6Of/Y5ioLcw%3D) whose response is
```json
{"next_endpoint":"\/code-challenge\/{your solution}\/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=HetXcLpRfrARcCi8%2BTKAzgzzqEuybUC6FeucdMGf6h4y6BRWcX7tgm7TIZowfdXX7soY1CQ2Z6MGYeFZ%2Bc9eGRxC0ux0dNCEoldnvkkHxFd2eaOprVOUmKke%2FNGelfTz","operation":"date_addition","arguments":["Sun, 12 Jan 2020 22:32:27 -0500","13 seconds"],"operations_remaining":null}
```
Then a quick js bit to get the answer
```js
var from = new Date("Sun, 12 Jan 2020 22:32:27 -0500");
var numberOfSecondsToAdd = 13;
from.setDate(from.getDate() + numberOfSecondsToAdd) #change this line, it was something else
```
so I tried [this url](http://codechallenge.meredith.com/code-challenge/6765/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=zoZpkskvb19V4fKCNNjEXUfucDeqgy3az5VnsKZ3hwnDiZKEvFeLxaS7hQxPpVimUW4t3%2BoHzsUfteTQpqIO7mjmny4UELjgE%2BKHhf765FA%3D) whose response is:
```json
{"next_endpoint":"\/code-challenge\/{your solution}\/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=wYACrQWM28SxYU16OpXfD8PwRzvdwSGzhDKi7Ce2SAaLItDcfj77%2FE91LDmhaVbad86eKBUqrF90eeRAcCvJF1SGnwPOMI0IwrIShBFHolcsCXhM7SZpbSaUkNZqR1yW52%2Fm5o6c7bhV5K8qDcxQtg%3D%3D","operation":"date_addition","arguments":["Sun, 12 Jan 2020 22:35:34 -0500","22 days"],"operations_remaining":17}
```
To test things out, I tried [this purposefully incorrect url](http://codechallenge.meredith.com/code-challenge/1580788006327/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=wYACrQWM28SxYU16OpXfD8PwRzvdwSGzhDKi7Ce2SAaLItDcfj77%2FE91LDmhaVbad86eKBUqrF90eeRAcCvJF1SGnwPOMI0IwrIShBFHolcsCXhM7SZpbSaUkNZqR1yW52%2Fm5o6c7bhV5K8qDcxQtg%3D%3D):
```json
{"error":"\u00221580788006327\u0022 is incorrect! Please try again."}
```
and [this purposefully incorrect url](http://codechallenge.meredith.com/code-challenge/1580788108600/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=wYACrQWM28SxYU16OpXfD8PwRzvdwSGzhDKi7Ce2SAaLItDcfj77%2FE91LDmhaVbad86eKBUqrF90eeRAcCvJF1SGnwPOMI0IwrIShBFHolcsCXhM7SZpbSaUkNZqR1yW52%2Fm5o6c7bhV5K8qDcxQtg%3D%3D):
```json
{"error":"\u00221580788108600\u0022 is incorrect! Please try again."}
```
Back on track, use js to get the next answer:
```js
var from = new Date("Sun, 12 Jan 2020 22:35:34 -0500");
var numberOfDaysToAdd = 22;
from.setDate(from.getDate() + numberOfDaysToAdd)
```
so I tried [this url](http://codechallenge.meredith.com/code-challenge/1580787334/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=wYACrQWM28SxYU16OpXfD8PwRzvdwSGzhDKi7Ce2SAaLItDcfj77%2FE91LDmhaVbad86eKBUqrF90eeRAcCvJF1SGnwPOMI0IwrIShBFHolcsCXhM7SZpbSaUkNZqR1yW52%2Fm5o6c7bhV5K8qDcxQtg%3D%3D):
```json
{"next_endpoint":"\/code-challenge\/{your solution}\/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=AFoO61pL8sKjK6QFzgyN8yarz85WcnGaMpHW%2FqdiDXeSLGl61aCFcogEko9GYSHl%2Fp%2BmzzmWhyBbwiQqKZpY5TZU7eViJzVVXvDM2Z6zZPE%3D","operation":"next_fibonacci_number","arguments":[0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765,10946,17711,28657,46368],"operations_remaining":16}
```
Sequence at https://oeis.org/A000045 helps to get the next answer so I tried [this url](http://codechallenge.meredith.com/code-challenge/75025/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=AFoO61pL8sKjK6QFzgyN8yarz85WcnGaMpHW%2FqdiDXeSLGl61aCFcogEko9GYSHl%2Fp%2BmzzmWhyBbwiQqKZpY5TZU7eViJzVVXvDM2Z6zZPE%3D) whose response is:
```json
{"next_endpoint":"\/code-challenge\/{your solution}\/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=ELfZmwJmYti64A8GStFjEC4DXVpl2fmmhsw8%2FhQtnW3kq6uvgOxNhjAIsNw7HazD%2BSX2LYDYrhy9g1T3qJt8TAhuK1jlzSTohy8fpNMNNMo%3D","operation":"addition","arguments":[-13,-85,-85,67,-29,-87],"operations_remaining":15}
```
Use js to get the next answer:
```js
[-13,-85,-85,67,-29,-87].reduce((a, b) => a + b, 0)
```
so I tried [this url](http://codechallenge.meredith.com/code-challenge/-232/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=ELfZmwJmYti64A8GStFjEC4DXVpl2fmmhsw8%2FhQtnW3kq6uvgOxNhjAIsNw7HazD%2BSX2LYDYrhy9g1T3qJt8TAhuK1jlzSTohy8fpNMNNMo%3D) whose response is
```json
{"next_endpoint":"\/code-challenge\/{your solution}\/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=93uw66jrOJ0dEh1idWlKpN9fnSIdN%2FI6UuFCgcBRtAED947i3k6wTKjwow9XN60FrrAzPZM8qdYraTcvtTXYCw%3D%3D","operation":"addition","arguments":[-23,95,89],"operations_remaining":14}
```

We now have enough ideas for the solution.

It can't work synchronuously so didn't use:
```js
while(command.operations_remaining) {
	request({
	    url: command.url
	}, function(error, response, body){
	    if(error) {
	        console.error(error);
	        command.operations_remaining = false
	    } else {
	        console.log('GET: ', response.request.uri.href)
	        console.log('Response: ', body)
	        command.operations_remaining = false
	    }
	});
	console.info(command.operations_remaining)
}
```

Irrelevant tries include [this url](http://codechallenge.meredith.com/code-challenge/676/?auth=dT/ppozhl094XvDwxUArVcXgovsHNvHe6Of/Y5ioLcw%3D) whose response is
```
{"next_endpoint":"\/code-challenge\/{your solution}\/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=r9fZRfqvfu5Vvq2JhNzChZIPDXBUlJvP7ueXMg0IfOyc4FgeqZGJpgoJHsqO3QxF","operation":"addition","arguments":[74,-34,4,-27,54,38,-95,-1,44],"operations_remaining":null}
```
and [this url](http://codechallenge.meredith.com/code-challenge/676/?auth=dT/ppozhl094XvDwxUArVcXgovsHNvHe6Of/Y5ioLcw%3D) whose response is
```
{"next_endpoint":"\/code-challenge\/{your solution}\/?auth=dT%2Fppozhl094XvDwxUArVcXgovsHNvHe6Of%2FY5ioLcw%3D&token=Dn3S3bT%2BQOvv%2FqnyOGLujakqC%2FKGZ9%2BfetZZwzW1taI1oBpQDJu7513nqjMc5e92","operation":"multiplication","arguments":[100,-92],"operations_remaining":null}
```

# Todo's
Done in 3h so left includes

* log/investigate performance (try [ab (Apache Bench)](https://stackoverflow.com/questions/17589178/why-should-i-use-restify))
* more sustainable methodologies
* allow user configuration
* check if Docker already using :8000
* make docker run as Daemon
* add tests/assertions
* CMD in Dockerfile for the last line

# Sources

* [request js](https://stackoverflow.com/questions/34327599/using-express-js-to-consume-an-api)
* [test API](https://docs.postman-echo.com/?version=latest)
* [request](https://www.npmjs.com/package/request)
* [promises](https://developers.google.com/web/fundamentals/primers/promises)