export interface Character {
  alive: boolean;
  character_id: number;
  class?: {
    class_id: number;
    name: string;
  };
  created_at: string;
  level: number;
  money: number;
  name: string;
  updated_at: string;
  xp: number;
}
