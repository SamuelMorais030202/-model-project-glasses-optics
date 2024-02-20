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
}

export class GlasseService {
  constructor(
    private glasseRepository: IGlassesRepository,
  ) { }

  async create(glasse: IGlassesCreate): Promise<IGlasses> {
    const createGlasse = await this.glasseRepository.create(glasse);
    return createGlasse;
  }
}