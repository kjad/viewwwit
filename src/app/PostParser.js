// import React from 'react'
// import Video from './displays/Video'
// import Image from './displays/Image'
// import Gfycat from './displays/Gfycat'

export const parse = data => {
  return new Promise((resolve, reject) => {
    determineUrl({ raw: data })
      .then(data => determineType(data))
      .then(data => determineDimensions(data))
      .then(data => resolve(data))
      .catch(e => reject(e))
  })

}

const determineUrl = (data) => {
  return new Promise((resolve, reject) => {
    data.url = null

    // Imgur
    if (data.raw.domain.match(/imgur/) && !data.raw.url.match(/jpg|png|gif|gifv$/)) {
      data.url = data.raw.url + 'l.jpg'

    // Gifv files
    } else if (data.raw.url.match(/\.gifv$/)) {
      data.url = data.raw.url.replace(/gifv/, 'mp4')

    // Imgur albums

    // quickmeme.com
    } else if (data.raw.domain.match(/quickmeme.com/)) {
      let parts = data.raw.url.split('/')
      let qkid = parts[parts.length - 2]
      data.url = 'http://i.qkme.me/' + qkid + '.jpg'

    // gfycat.com
    } else if (data.raw.domain.match(/gfycat/)) {
      let matches = data.raw.url.match(/(\w+)$/)
      let id = matches[1]
      data.url = `https://gfycat.com/ifr/${id}`

    // Any other image file
    } else if (data.raw.url.match(/jpg|png|gif$/)) {
      data.url = data.raw.url

    // TODO: youtube.com

    // TODO: clips.twitch.com

    // Otherwise, its unsupported
    }

    if (data.url) {
      resolve(data)
    } else {
      reject({ error: `Could not determine URL for ${data.raw.url}`})
    }
  })
}

const determineType = (data) => {
  return new Promise((resolve, reject) => {
    if (! data.url) {
      reject({ error: "No URL to determine type" })
    }

    data.type = 'image'
    if (data.url.match(/\.mp4$/)) {
      data.type = 'video'
    } else if (data.url.match(/gfycat/)) {
      data.type = 'gfycat'
    }

    resolve(data)
  })
}

export const determineDimensions = (data) => {

  // TODO: Support mp4/gfycat

  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = data.url

    let i = 0
    const max = 100
    const interval = 10
    const poll = setInterval(() => {

      i += 1
      if (i > max) {
        clearInterval(poll)
        reject({ error: `Cannot get dimenions for image ${data.url}` })
      }

      if (img.naturalWidth) {
        clearInterval(poll);

        data.dimensions = {
          width: img.naturalWidth,
          height: img.naturalHeight
        }
        resolve(data)
      }
    }, interval);
  })

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
