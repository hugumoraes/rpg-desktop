import { api } from '..';

import { Class } from '../../types/classes.types';

interface GetClasses {
  signal: AbortSignal;
}

class ClassesService {
  get_classes = async ({ signal }: GetClasses): Promise<Class[]> => {
    try {
      const { data } = await api.get<Class[]>('/classes', { signal });

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  };
}

export const classes_service = new ClassesService();
