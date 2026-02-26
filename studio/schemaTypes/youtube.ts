import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
      description: 'Paste the full YouTube URL here.'
    })
  ]
})