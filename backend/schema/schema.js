const graphql = require('graphql');
const Employee = require('../models/employee');
const Schedule = require('../models/schedule');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const EmployeeType = new GraphQLObjectType({
    name: "Employee",
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        schedules: {
            type: new GraphQLList(ScheduleType),
            resolve(parent, args) {
                return Schedule.find({ leads: { $in: [parent.id] } }).concat(Schedule.find({ backups: { $in: [parent.id] } }));
            }
        }
    })
});

const ScheduleType = new GraphQLObjectType({
    name: 'Schedule',
    fields: () => ({
        id: { type: GraphQLID },
        month: { type: GraphQLInt },
        year: { type: GraphQLInt },
        leads: { type: new GraphQLList(GraphQLID) },
        backups: { type: new GraphQLList(GraphQLID) }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        employee: {
            type: EmployeeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Employee.findById(args.id);
            }
        },
        schedule: {
            type: ScheduleType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Schedule.findById(args.id);
            }
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args) {
                // return all employees
                return Employee.find({});
            }
        },
        schedules: {
            type: new GraphQLList(ScheduleType),
            resolve(parent, args) {
                // return all schedules
                return Schedule.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let employee = new Employee({
                    firstName: args.firstName,
                    lastName: args.lastName
                });
                return employee.save();
            }
        },
        addSchedule: {
            type: ScheduleType,
            args: {
                month: { type: new GraphQLNonNull(GraphQLInt) },
                year: { type: new GraphQLNonNull(GraphQLInt) },
                leads: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
                backups: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) }
            },
            resolve(parent,args) {
                let schedule = new Schedule({
                    month: args.month,
                    year: args.year,
                    leads: args.leads,
                    backups: args.backups
                });
                return schedule.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});