import { TestBed } from '@angular/core/testing';

import { WeatherreportService } from './weatherreport.service';

describe('WeatherreportService', () => {
  let service: WeatherreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
