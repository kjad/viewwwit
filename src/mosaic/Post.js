import React from 'react'
import Video from './displays/Video'
import Image from './displays/Image'
import Gfycat from './displays/Gfycat'

class Post {
  constructor(p) {
    this.data = p
    this.valid = true
    this.url = this.pickUrl()
    this.type = this.determineType()
    this.dimensions = this.determineDimensions()
  }

  pickUrl() {
    let url = this.data.url;

    // Imgur
    if (this.data.domain.match(/imgur/) && !url.match(/jpg|png|gif|gifv$/)) {
      url += 'l.jpg'

    // Gifv files
    } else if (url.match(/\.gifv$/)) {
      url = url.replace(/gifv/, 'mp4')

    // quickmeme.com
    } else if (this.data.domain.match(/quickmeme.com/)) {
      let parts = this.data.url.split('/')
      let qkid = parts[parts.length - 2]
      url = 'http://i.qkme.me/' + qkid + '.jpg'

    // gfycat.com
    } else if (this.data.domain.match(/gfycat/)) {
      let matches = url.match(/(\w+)$/)
      let id = matches[1]
      url = `https://gfycat.com/ifr/${id}`

    // Any other image file
    } else if (url.match(/jpg|png|gif$/)) {
      // pass

    // TODO: youtube.com

    // TODO: clips.twitch.com

    // Otherwise, its unsupported
    } else {
      console.log("Possibly unsupported url: ", url, this.data)
      this.valid = false
    }
    return url
  }

  determineType() {
    let type = 'image'
    if (this.url.match(/\.mp4$/)) {
      type = 'video'
    } else if (this.url.match(/gfycat/)) {
      type = 'gfycat'
    }
    return type
  }

  determineDimensions() {
    let img = document.createElement('img');
    img.src = this.url

    let poll = setInterval(() => {
      if (img.naturalWidth) {
        clearInterval(poll);
        this.dimensions = {
          width: img.naturalWidth,
          height: img.naturalHeight
        }
      }
    }, 10);
  }

  display() {
    switch (this.type) {
      case 'video':
        return (<Video post={this} />)
      case 'gfycat':
        return (<Gfycat post={this} />)
      case 'image':
      default:
        return (<Image post={this} />)
    }
  }
}

export default Post
