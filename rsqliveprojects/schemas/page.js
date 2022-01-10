export default {
  name: "project",
  type: "document",
  title: "Project",
  fields: [
    {
      name: 'projectTitle',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'project_title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: input => input
        .toLowerCase()
        .replace(/\s+/g, '-')
        .slice(0, 200)
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'release_date',
      title: 'Release Date',
      type: 'date'
    },
    {
      name: 'Project_hero_image',
      title: 'Project Hero Image',
      type: 'image'
    },
    {
      name: 'project_headline',
      title: 'Project Headline',
      type: 'string'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'}
      ],
    }
  ]
}
