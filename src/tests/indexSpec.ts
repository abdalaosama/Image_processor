function myFunc(t: number) {
  return 25;
}

it('expect myFunc(5) to equal 25', () => {
  expect(myFunc(5)).toEqual(25);
});
