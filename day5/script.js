console.log('Hey! lets start here');

setTimeout(() => {
  console.log('boom! 1');
}, 0);

setImmediate(() => {
  console.log('Immediate 1');
});

setTimeout(() => {
  console.log('boom!! 2');
}, 0);

setImmediate(() => {
  console.log('Immediate 2');
});

console.log('Alright i am tired lets end her');
