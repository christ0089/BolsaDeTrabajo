import { WorkHoursPipe } from './work-hours.pipe';

describe('WorkHoursPipe', () => {
  it('create an instance', () => {
    const pipe = new WorkHoursPipe();
    expect(pipe).toBeTruthy();
  });
});
