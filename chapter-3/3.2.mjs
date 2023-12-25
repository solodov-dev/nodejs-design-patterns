import { EventEmitter } from "events";

function ticker(seconds, cb) {
  const eventEmitter = new EventEmitter();
  let count = 0;

  function countDown() {
    eventEmitter.emit("tick");
    count++;
    seconds -= 50;
    tick();
  }

  function tick() {
    if (seconds <= 0) return cb(null, count);
    setTimeout(countDown, 50);
  }

  tick();

  return eventEmitter;
}

ticker(1000, (err, ticks) =>
  err ? console.error(err) : console.log(ticks)
).on("tick", () => console.log("tick"));
