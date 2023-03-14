"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
async function getTodos() {
    const params = {
        TableName: process.env.TODOS_TABLE,
    };
    try {
        const data = await docClient.scan(params).promise();
        return data.Items;
    }
    catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}
exports.default = getTodos;
// const params = {
//     TableName: 'process.env.TODOS_TABLE',
//     FilterExpression : "begins_with(#title, :title)",
//     ExpressionAttributeNames: { "#title": "title" },
//     ExpressionAttributeValues: {
//         ':title':"todo"
//     }
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VG9kb3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRUb2Rvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvQixNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7QUFFcEQsS0FBSyxVQUFVLFFBQVE7SUFDbkIsTUFBTSxNQUFNLEdBQUc7UUFDWCxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXO0tBQ3JDLENBQUE7SUFDRCxJQUFJO1FBQ0EsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ25ELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtLQUNwQjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNwQyxPQUFPLElBQUksQ0FBQTtLQUNkO0FBQ0wsQ0FBQztBQUVELGtCQUFlLFFBQVEsQ0FBQztBQUV4QixtQkFBbUI7QUFDbkIsNENBQTRDO0FBQzVDLHdEQUF3RDtBQUN4RCx1REFBdUQ7QUFDdkQsbUNBQW1DO0FBQ25DLDBCQUEwQjtBQUMxQixRQUFRO0FBQ1IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEFXUyA9IHJlcXVpcmUoJ2F3cy1zZGsnKTtcbmNvbnN0IGRvY0NsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0VG9kb3MoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlRPRE9TX1RBQkxFLFxuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jQ2xpZW50LnNjYW4ocGFyYW1zKS5wcm9taXNlKClcbiAgICAgICAgcmV0dXJuIGRhdGEuSXRlbXNcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0R5bmFtb0RCIGVycm9yOiAnLCBlcnIpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRUb2RvcztcblxuLy8gY29uc3QgcGFyYW1zID0ge1xuLy8gICAgIFRhYmxlTmFtZTogJ3Byb2Nlc3MuZW52LlRPRE9TX1RBQkxFJyxcbi8vICAgICBGaWx0ZXJFeHByZXNzaW9uIDogXCJiZWdpbnNfd2l0aCgjdGl0bGUsIDp0aXRsZSlcIixcbi8vICAgICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHsgXCIjdGl0bGVcIjogXCJ0aXRsZVwiIH0sXG4vLyAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuLy8gICAgICAgICAnOnRpdGxlJzpcInRvZG9cIlxuLy8gICAgIH1cbi8vIH07Il19