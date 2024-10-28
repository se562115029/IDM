import Rating from "@/app/_components/Rating";
import { render } from "@testing-library/react";

describe("Rating", () => {
  const grayStar = "#E4E5E9";
  it("Render a rating with rating is 0", () => {
    const { container } = render(<Rating rating={0}></Rating>);
    const star = container.querySelector(".lucide-star");
    const stars = container.querySelectorAll(".lucide-star");

    let countGray = 0;
    let countYellow = 0;

    stars.forEach((x) => {
      const color = x.getAttribute("stroke");
      if (color === grayStar) {
        countGray += 1;
      } else {
        countYellow += 1;
      }
    });

    /** Check the rating represent in DOM */
    expect(star).toBeInTheDocument();
    /** Must 5 star rating */
    expect(stars.length).toBe(5);

    /** Gray start should be 5 */
    expect(countGray).toBe(5);

    /** Yellow start should be 0 */
    expect(countYellow).toBe(0);
  });

  it("Render a rating with rating is 2.2", () => {
    const { container } = render(<Rating rating={2.2}></Rating>);
    const star = container.querySelector(".lucide-star");
    const stars = container.querySelectorAll(".lucide-star");

    let countGray = 0;
    let countYellow = 0;

    stars.forEach((x) => {
      const color = x.getAttribute("stroke");
      if (color === grayStar) {
        countGray += 1;
      } else {
        countYellow += 1;
      }
    });

    /** Check the rating represent in DOM */
    expect(star).toBeInTheDocument();
    /** Must 5 star rating */
    expect(stars.length).toBe(5);

    /** Gray start should be 3 */
    expect(countGray).toBe(3);

    /** Yellow start should be 2 */
    expect(countYellow).toBe(2);
  });

  it("Render a rating with rating is 5", () => {
    const { container } = render(<Rating rating={5}></Rating>);
    const star = container.querySelector(".lucide-star");
    const stars = container.querySelectorAll(".lucide-star");

    let countGray = 0;
    let countYellow = 0;

    stars.forEach((x) => {
      const color = x.getAttribute("stroke");
      if (color === grayStar) {
        countGray += 1;
      } else {
        countYellow += 1;
      }
    });

    /** Check the rating represent in DOM */
    expect(star).toBeInTheDocument();
    /** Must 5 star rating */
    expect(stars.length).toBe(5);

    /** Gray start should be 0 */
    expect(countGray).toBe(0);

    /** Yellow start should be 5 */
    expect(countYellow).toBe(5);
  });
});
