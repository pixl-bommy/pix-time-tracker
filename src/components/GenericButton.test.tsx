import GenericButton from "./GenericButton";

describe("<GenericButton />", () => {
   describe("no props -> empty button", () => {
      let button: JSX.Element;

      beforeAll(() => (button = GenericButton({})));

      test("is type 'button'", () => {
         expect(button.type).toEqual("button");
      });

      test("no label", () => {
         expect(button.props.children).toBeUndefined();
      });

      test("no click handler", () => {
         expect(button.props.onClick).toBeUndefined();
      });

      test("basic style", () => {
         expect(button.props.className).toEqual("GenericButton full");
      });

      test("no unexpected props", () => {
         expect(button.props).toStrictEqual({
            className: "GenericButton full",
            children: undefined,
            onClick: undefined,
         });
      });
   });

   test("selected = true -> className 'selected' is set", () => {
      const button = GenericButton({ selected: true });
      expect(button.props.className).toEqual("GenericButton selected full");
   });

   test("size is set -> className is not default 'full'", () => {
      const button = GenericButton({ size: "quater" });
      expect(button.props.className).not.toMatch("full");
   });

   test("size = half -> className 'half' is set", () => {
      const button = GenericButton({ size: "half" });
      expect(button.props.className).toMatch("half");
   });

   test("size = quater -> className 'quater' is set", () => {
      const button = GenericButton({ size: "quater" });
      expect(button.props.className).toMatch("quater");
   });

   test("onClick -> onClick is set", () => {
      const clickHandler = jest.fn();
      const button = GenericButton({ onClick: clickHandler });
      expect(button.props.onClick).toBe(clickHandler);
   });

   test("children = 'text' -> button label is 'text'", () => {
      const button = GenericButton({ children: "text" });
      expect(button.props.children).toMatch("text");
   });
});
