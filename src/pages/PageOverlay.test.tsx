import React from "react";
import { render } from "@testing-library/react";

import PageOverlay from "./PageOverlay";

describe("<PageOverlay />", () => {
   describe("empty props -> renders minimal element", () => {
      let Element: HTMLDivElement;

      beforeAll(() => {
         const { container } = render(<PageOverlay />);
         Element = container.children[0] as HTMLDivElement;
      });

      test("top element has classname 'PageOverlay'", () => {
         expect(Element.className).toEqual("PageOverlay");
      });

      test("has one child only", () => {
         expect(Element.children).toHaveLength(1);
      });

      test("first child includes 'back' button", () => {
         const button = Element.children[0].children[0];
         expect(button.tagName.toLocaleLowerCase()).toEqual("button");
         expect(button.className).toEqual("text-button");
      });

      test("'back' button has no clickhandler", () => {
         const button = Element.children[0].children[0] as HTMLButtonElement;
         expect(button.onclick).toBeNull();
      });

      test("first child includes no text", () => {
         const div = Element.children[0];
         expect(div.textContent).toEqual("");
      });
   });

   describe("children -> renders correct element", () => {
      let Element: HTMLDivElement;

      beforeAll(() => {
         const { container } = render(
            <PageOverlay>
               <p>cookies</p>
            </PageOverlay>,
         );
         Element = container.children[0] as HTMLDivElement;
      });

      test("top element has classname 'PageOverlay'", () => {
         expect(Element.className).toEqual("PageOverlay");
      });

      test("has a second child", () => {
         expect(Element.children).toHaveLength(2);
      });

      test("second child is children", () => {
         const p = Element.children[1];
         expect(p.textContent).toEqual("cookies");
      });
   });

   describe("className -> renders correct element", () => {
      let Element: HTMLDivElement;

      beforeAll(() => {
         const { container } = render(<PageOverlay className="husldapp" />);
         Element = container.children[0] as HTMLDivElement;
      });

      test("top element has correct classname", () => {
         expect(Element.className).toEqual("PageOverlay husldapp");
      });
   });

   describe("goBack -> renders correct element", () => {
      let Element: HTMLDivElement;

      beforeAll(() => {
         const { container } = render(<PageOverlay goBack={() => 1} />);
         Element = container.children[0] as HTMLDivElement;
      });

      test("'back' button has a clickhandler", () => {
         const button = Element.children[0].children[0] as HTMLButtonElement;
         expect(typeof button.onclick).toEqual("function");
      });
   });

   describe("title -> renders correct element", () => {
      let Element: HTMLDivElement;

      beforeAll(() => {
         const { container } = render(<PageOverlay title="Olé" />);
         Element = container.children[0] as HTMLDivElement;
      });

      test("first child includes title", () => {
         const div = Element.children[0];
         expect(div.textContent).toEqual("Olé");
      });
   });
});
