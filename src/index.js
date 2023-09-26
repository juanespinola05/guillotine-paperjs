import paper from "@scratch/paper";
import "./styles.css";
import { pieces } from "./data.js";

// paper.install(window)

const width = 1830 / 4;
const height = 2600 / 4;
const FACTOR = height + 100;
const area = 1830 * 2600;

const randomHex = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

var canvas = document.getElementById("canvas");
// Create an empty project and a view for the canvas:
paper.setup(canvas);
pieces.forEach((bin, index) => {
  const path = new paper.Path.Rectangle([0, index * FACTOR], [width, height]);
  path.closed = true;
  path.strokeColor = "black";
  path.strokeWidth = 2;
  const totalAreaUsed = bin.reduce(
    (acc, curr) => acc + curr.width * curr.height,
    0
  );
  bin.forEach((item) => {
    const rectangle = new paper.Path.Rectangle(
      [item.x / 4, item.y / 4 + index * FACTOR],
      [item.width / 4, item.height / 4]
    );
    rectangle.center = [width / 4 / 2, height / 4 / 2];
    rectangle.fillColor = randomHex();
    rectangle.strokeColor = "black";
    const text = new paper.PointText({
      point: [width + 50, index * FACTOR + 200],
      content: `Usado ${(totalAreaUsed * 100) / area}%`,
      fillColor: "black",
      fontWeight: "bold",
      fontSize: 25
    });
  });
});

pieces[0].forEach((item) => {});

paper.view.draw();
