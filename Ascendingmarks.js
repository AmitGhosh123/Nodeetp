const { MongoClient } = require('mongodb'); 
const uri =
"mongodb://0.0.0.0";
const client = new MongoClient(uri);
(async () => {
 try {
 await client.connect();
 // Create a database
 const db = client.db('School');
 // Create a 'Student' collection
 const studentCollection = db.collection('Student');
 // Add multiple documents with student data
 const students = [
 { Sid: 1, Name: 'Amit', Subject: 'Math', Branch: 'CS', Marks: 85 },
 { Sid: 2, Name: 'Reyna', Subject: 'defense', Branch: 'CS', Marks: 90 },
 { Sid: 3, Name: 'chamber', Subject: 'attack', Branch: 'CS', Marks: 95 },
 ];
 const insertResult = await studentCollection.insertMany(students);
 console.log('Inserted students:', insertResult.insertedCount);
 // Sort the student details by marks (ascending order) and display them in the

 const sortedStudents = await studentCollection
 .find()
 .sort({ Marks: 1 })
 .toArray();
 console.log('Sorted students by marks (ascending):', sortedStudents);
 } catch (error) {
 console.error('Error:', error);
 } finally {
 await client.close();
 }
})();