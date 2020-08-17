import { GET_SUBJECT_LIST } from './constants'

const initSubjectList = {
  total: 0, // 总数
  items: [] // 课程分类数据
}

export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      // action.data
      /**
       * {
       *  total: 0,
       *  items: [{
       *     _id: xxx,
       *     title: yyy,
       *     parentId: 0
       *     children:[]  如果数据中有children属性,并且值是数组.那么table组件就会自动给每一行添加一个可展开按钮
       *  }]
       * }
       */
      // console.log(action.data)
      action.data.items.forEach(item => {
        item.children = []
      })

      return action.data
    default:
      return prevState
  }
}
