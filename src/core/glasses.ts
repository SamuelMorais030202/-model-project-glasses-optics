export interface IGlasses {
  id: number;
  size: string;
  model: string;
  genere: string;
  price: number;
  color: string;
}

export interface IGlassesCreate {
  size: string;
  model: string;
  genere: string;
  price: number;
  color: string;
}

export interface IGlassesRepository {
  create(glasse: IGlassesCreate): Promise<IGlasses>;
  getGlassesAll(): Promise<IGlasses[]>;
  getGlassesById(id: number): Promise<IGlasses | null>;
  getGlasseByModel(model: string): Promise<IGlasses[] | null>;
  deleteGlasseById(id: number): Promise<IGlasses>;
  updateGlasse(glasse: IGlasses): Promise<IGlasses | null>
}

export class GlasseService {
  constructor(
    private glasseRepository: IGlassesRepository,
  ) { }

  async create(glasse: IGlassesCreate): Promise<IGlasses> {
    const createGlasse = await this.glasseRepository.create(glasse);
    return createGlasse;
  }

  async getGlassesAll(): Promise<IGlasses[]> {
    const glasses = await this.glasseRepository.getGlassesAll();
    return glasses;
  }

  async getGlassesById(id: number): Promise<IGlasses | string> {
    const glasse = await this.glasseRepository.getGlassesById(id);
    if (glasse === null) {
      throw new Error('Glasse not found');
    };

    return glasse;
  }

  async getGlasseByModel(model: string): Promise<IGlasses[] | string> {
    const glasses = await this.glasseRepository.getGlasseByModel(model);
    if (glasses === null) {
      throw new Error('Glasse not found')
    }

    return glasses;
  }

  async deleteGlasseById(id: number): Promise<IGlasses | string> {
    const veriyGlasseExists = await this.glasseRepository.getGlassesById(id);
    if (veriyGlasseExists === null) {
      throw new Error('Glasse not found');
    }

    const deleteGlasse = await this.glasseRepository.deleteGlasseById(id);
    return deleteGlasse;
  }

  async updateGlasse(glasse: IGlasses): Promise<IGlasses | string> {
    const veriyGlasseExists = await this.glasseRepository.getGlassesById(glasse.id);
    if (veriyGlasseExists === null) {
      throw new Error('Glasse not found');
    }

    const updateGlasse = await this.glasseRepository.updateGlasse(glasse);
    if (updateGlasse === null) {
      throw new Error('Unable to update glasse');
    }

    return updateGlasse;
  }
}