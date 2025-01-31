export interface ClassAttributes {
  class_attribute_id: number;
  value: number;
  attribute?: {
    attribute_id: number;
    name:
      | 'Strength'
      | 'Dexterity'
      | 'Intelligence'
      | 'Luck'
      | 'Health'
      | 'Mana';
    description: string;
  };
}
