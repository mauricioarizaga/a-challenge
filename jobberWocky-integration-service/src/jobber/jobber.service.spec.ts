import { Test, TestingModule } from '@nestjs/testing';
import { JobberWockyService } from './jobber.service';

describe('JobberWockyService', () => {
  let service: JobberWockyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobberWockyService],
    }).compile();

    service = module.get<JobberWockyService>(JobberWockyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
