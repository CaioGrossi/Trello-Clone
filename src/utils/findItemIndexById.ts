type Item = {
  id: string;
};
const findItemIndexById = <T extends Item>(items: T[], id: string) => {
  return items.findIndex((item: T) => item.id === id);
};

export default findItemIndexById;
