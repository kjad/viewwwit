// import React from 'react'
// import Video from './displays/Video'
// import Image from './displays/Image'
// import Gfycat from './displays/Gfycat'

export const pickUrl = data => {
  let url = null

  // Imgur
  if (data.domain.match(/imgur/) && !data.url.match(/jpg|png|gif|gifv$/)) {
    url = data.url + 'l.jpg'

  // Gifv files
  } else if (data.url.match(/\.gifv$/)) {
    url = url.replace(/gifv/, 'mp4')

  // Imgur albums

  // quickmeme.com
  } else if (data.domain.match(/quickmeme.com/)) {
    let parts = data.url.split('/')
    let qkid = parts[parts.length - 2]
    url = 'http://i.qkme.me/' + qkid + '.jpg'

  // gfycat.com
  } else if (data.domain.match(/gfycat/)) {
    let matches = data.url.match(/(\w+)$/)
    let id = matches[1]
    url = `https://gfycat.com/ifr/${id}`

  // Any other image file
  } else if (data.url.match(/jpg|png|gif$/)) {
    url = data.url

  // TODO: youtube.com

  // TODO: clips.twitch.com

  // Otherwise, its unsupported
  } else {
    console.log("Possibly unsupported url: ", data.url, data)
  }
  return url
}

// class PostParser {
//   constructor(p, dispatch) {
//     this.data = p
//     this.dispatch = dispatch
//
//     this.id = p.id
//     this.valid = true
//     this.loading = true
//
//     this.url = this.pickUrl()
//     this.type = this.determineType()
//     this.determineDimensions()
//   }
//
//
//   determineType() {
//     let type = 'image'
//     if (this.url.match(/\.mp4$/)) {
//       type = 'video'
//     } else if (this.url.match(/gfycat/)) {
//       type = 'gfycat'
//     }
//     return type
//   }
//
//   determineDimensions() {
//
//     // TODO: Support mp4/gfycat
//
//     let img = document.createElement('img');
//     img.src = this.url
//
//     let poll = setInterval(() => {
//       if (img.naturalWidth) {
//         clearInterval(poll);
//         this.dimensions = {
//           width: img.naturalWidth,
//           height: img.naturalHeight
//         }
//         this.loading = false
//       }
//     }, 10);
//   }
//
//   display(height) {
//     switch (this.type) {
//       case 'video':
//         return (<Video post={this} />)
//       case 'gfycat':
//         return (<Gfycat post={this} />)
//       case 'image':
//       default:
//         return (<Image post={this} height={height} />)
//     }
//   }
// }
//
// export default PostParser
