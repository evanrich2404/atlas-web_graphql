// schema allowing the querying of different types of data
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

// schema for projects and tasks:
const Project = require('../models/project');
const Task = require('../models/task');

// GraphQLObjectType for processing task related data
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    projectId: { type: GraphQLID },
    project: {
      // eslint-disable-next-line no-use-before-define
      type: ProjectType,
      resolve(parent) {
        return Project.findById(parent.projectId);
      },
    },
  }),
});

// GraphQLObjectType for processing project related data
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent) {
        // Use Task model to find all tasks with the projectId equal to parent.id
        return Task.find({ projectId: parent.id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const project = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description,
        });
        return project.save();
      },
    },
    addTask: {
      type: TaskType,
      args: {
        projectId: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const task = new Task({
          projectId: args.projectId,
          title: args.title,
          weight: args.weight,
          description: args.description,
        });
        return task.save();
      },
    },
  },
});

// GraphQLObjectType that is the root of the querying
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Use the args.id to find and return the task from the tasks array
        return Task.findById(args.id);
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve() {
        return Task.find({});
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find({});
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = { schema };
