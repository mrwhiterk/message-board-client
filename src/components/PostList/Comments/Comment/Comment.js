// import React, { Component } from 'react'
// import { CardHeader } from '@material-ui/core'
// import TextField from '@material-ui/core/TextField'
// import Avatar from '@material-ui/core/Avatar'
// import DeleteIcon from '@material-ui/icons/Delete'
// import IconButton from '@material-ui/core/IconButton'
// import { withStyles } from '@material-ui/core/styles'
// import { Link } from 'react-router-dom'
// import Context from '../../../Context/Context'

// const styles = theme => ({
//   cardHeader: {
//     paddingTop: theme.spacing(),
//     paddingBottom: theme.spacing()
//   },
//   smallAvatar: {
//     width: 25,
//     height: 25
//   },
//   commentField: {
//     width: '96%'
//   },
//   commentText: {
//     backgroundColor: 'white',
//     padding: theme.spacing(),
//     margin: `2px ${theme.spacing(2)}px 2px 2px`
//   },
//   commentDate: {
//     display: 'block',
//     color: 'gray',
//     fontSize: '0.8em'
//   },
//   commentDelete: {
//     fontSize: '1.6em',
//     verticalAlign: 'middle',
//     cursor: 'pointer'
//   },
//   userLink: {
//     textDecoration: 'none'
//   }
// })

// class Comment extends Component {
//   render() {
//     const { classes, comment } = this.props
//     console.log(this.props)

//     return (
//       <p className={classes.commentText}>
//         <Link to={''} className={classes.userLink}>
//           {comment.postedBy.username}
//         </Link>
//         <br />
//         {comment.text}
//         <span className={classes.commentDate}>{comment.created}</span>
//       </p>
//     )
//   }
// }

// export default withStyles(styles)(Comment)
