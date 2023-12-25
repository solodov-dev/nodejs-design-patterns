import { EventEmitter } from "events";

const DivisionError = new Error("Now is divisible by 5");

function ticker(seconds, cb) {
  const eventEmitter = new EventEmitter();
  let count = 0;

  function countDown() {
    if (Date.now() % 5 === 0) {
      eventEmitter.emit("error", DivisionError);
      cb(DivisionError);
    }
    eventEmitter.emit("tick");
    count++;
    seconds -= 50;
    tick();
  }

  function tick() {
    if (seconds <= 0) return cb(null, count);
    setTimeout(countDown, 50);
  }

  process.nextTick(countDown);

  return eventEmitter;
}

ticker(1000, (err, ticks) => (err ? console.error(err) : console.log(ticks)))
  .on("tick", () => console.log("tick"))
  .on("error", console.error);
