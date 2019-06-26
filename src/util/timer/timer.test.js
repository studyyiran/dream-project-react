import Timer from './index'


describe('1', () => {
  it('out of time', done => {
    const fake = {
      time: 1000,
      runCallBack: jest.fn((res) => {
        expect(res).toEqual([0,0,0,0])
      }),
      finishCallBack: (res) => {
        expect(res).toBe(0)
        done()
      }}
    let timer = new Timer(fake)
    expect.assertions(2);
    timer.start()
  })

  it('format', () => {
    const fake = {
      time: 10}
    let timer = new Timer(fake)
    expect(timer.format(24 * 60 * 60 * 1000)).toEqual(['01',0,0,0])
  })
})
