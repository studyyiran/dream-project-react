// 将不变的pure function 和 变化的状态分离开。function没变，但是data变了。
let haveInit = false
let visible = false
function componentDidMount() {
  if (!haveInit) {
    haveInit = true
    reviewServer.getReviewList()
  }
}

function pagesReviewRender(props) {
  componentDidMount()
  const reviewDom = document.createElement('div')
  reviewDom.setAttribute('class', 'review-page')
  const innerFormDom = cacheDomWithId(formDom({submit: (json) => {
      reviewServer.postNewReview(json)
    }}), 'pagesReviewPostReviewForm')
  let modal = new componentModal({children: innerFormDom})
  // TODO 难以搞定
  // const buttomDom = cacheDomWithId(renderButton(modal), 'pagesReviewPostReviewForm')
  const buttomDom = renderButton(modal)
  reviewDom.appendChild(buttomDom)
  reviewDom.appendChild(renderLine(props.reviewList))
  return reviewDom
}

function renderLine(list) {
  const lineContainer = document.createElement('div')
  lineContainer.innerHTML = `<table>
        <thead>
            <tr>
                <th>创建时间</th>
                <th>内容</th>
                <th>生命周期</th>
                <th>复习周期</th>
                <th>+1</th>
                <th>开始</th>
                <th>结束</th>
                <th>修改</th>
                <th>删除</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>`
  const tbody = lineContainer.querySelector('tbody');
  (list || []).forEach((item) => {
    const {_id, reviewContent, totalReviewNeedTime, needReviewCount, haveReviewCount, createTime, status} = item
    const tr = document.createElement('tr')
    // 设置status
    tr.setAttribute('data-status', status)
    const deadLineDate = moment().add(totalReviewNeedTime, 'd')
    tr.innerHTML = `
        <th>${moment(Number(createTime)).format('MM-DD hh:mm:ss  ')}</th>
        <th>${reviewContent}</th>
        <th>${moment(Number(createTime)).to(deadLineDate)}</th>
        <th>${haveReviewCount}/${needReviewCount}</th>
        <th><button date-type="finish">+1</button></th>
        <th><button date-type="start">开始</button></th>
        <th><button date-type="stop">结束</button></th>
        <th><button date-type="update">修改</button></th>
        <th><button date-type="delete">删除</button></th>
        `
    // 绑定button
    // start
    tr.querySelector('[date-type=start]').addEventListener('click', () => {
      reviewServer.updateReviewStatus(_id, 'start')
    })
    // stop
    tr.querySelector('[date-type=stop]').addEventListener('click', () => {
      reviewServer.updateReviewStatus(_id, 'stop')
    })
    const buttonFinish = tr.querySelector('[date-type=finish]')
    buttonFinish.addEventListener('click', () => {
      reviewServer.updateReviewStatus(_id, 'add')
    })
    const buttonDelete = tr.querySelector('[date-type=delete]')
    buttonDelete.addEventListener('click', () => {
      reviewServer.hideReviewItem(_id)
    })
    const buttonUpdate = tr.querySelector('[date-type=update]')

    buttonUpdate.addEventListener('click', () => {
      console.log('test')
      const dom = formDom({
        submit: (json) => {
          reviewServer.updateReviewInfo({...json, id: _id})
        },
        reviewContent,
        totalReviewNeedTime,
        needReviewCount,
      })
      const modal = renderModal(dom)
      const div = document.createElement('div')
      // div.textContent = 'akdfjadkfakd'
      root.appendChild(modal)
    })
    tbody.appendChild(tr)
  })
  return lineContainer
  //  我不明白这个有啥用？
  // return makeSlot(root, lineContainer, 'pagesReviewIndexList')
}

function renderModal(childDom) {
  const modal = document.createElement('modal')
  modal.setAttribute('class', 'components-modal')
  modal.appendChild(childDom)
  return modal
}

function renderButton (modal) {
  const button = document.createElement('button')
  button.innerText = '新建任务'
  modal.setVisible(visible)
  button.addEventListener('click', () => {
    visible = !visible
    modal.setVisible(visible)
  })
  return button
}

function formDom (props) {
  const {submit, reviewContent='', totalReviewNeedTime, needReviewCount} = props
  const form = document.createElement('form')
  // form.setAttribute('method', 'post')
  // form.setAttribute('action', '')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const json = {}
    arr.forEach(({id}) => json[id] = form && form[id] && form[id].value)
    submit && submit(json)
  })

  const arr = [
    {
      name: '内容',
      id: 'reviewContent',
    },
    {
      name: '半衰期',
      id: 'totalReviewNeedTime'
    },
    {
      name: '持续进攻次数',
      id: 'needReviewCount'
    }
  ]
  arr.forEach((item) => {
    newInput(item)
  })
  function newInput(item) {
    console.log('new input')
    const {id, name} = item
    const container = document.createElement('div')
    const label = document.createElement('label')
    label.setAttribute('for', id)
    label.innerText = name
    const input = document.createElement('input')
    input.id = id
    input.name = id
    input.value = props[id]
    container.appendChild(label)
    container.appendChild(input)
    form.appendChild(container)
  }
  const button = document.createElement('button')
  button.innerText = '提交'
  // 这行的作用是什么？
  button.setAttribute('type', 'submit')
  form.appendChild(button)
  return form
}