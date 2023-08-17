const HttpError = require('../models/http-error');
const mongoose = require('mongoose')

const Student = require('../models/student');

const getAllStudents = async (req, res, next) => {

  let foundStudent;
  try {
    foundStudent = await Student.find({});
  } catch (err) {
    return (next(new HttpError("couldn't find the student..."), 404));
  }

  if (!foundStudent) {
    const error = new HttpError(
      'No Students Found.',
      404
    );
    return next(error);
  }

  foundStudent.sort((a,b)=>{
    if(+b.ctc === +a.ctc){
      if(b.name < a.name){
        return 0;
      }
    }else{
      return +b.ctc- +a.ctc;
    }
  });
  foundStudent[0].instituteRank=1;
  let n = foundStudent.length
  for(let i=1;i<n;i++){
    if(foundStudent[i].ctc!=foundStudent[i-1].ctc){
      foundStudent[i].instituteRank=foundStudent[i-1].instituteRank+1
    }else{
      foundStudent[i].instituteRank = foundStudent[i-1].instituteRank
    }
  }

  // console.log(foundStudent.length);

  res.json({ students:foundStudent.map(S=>{
    return S.toObject({getters:true});
  }) });

};

const getStudentById = async (req, res, next) => {

  const studentId = req.params.sid;
  let foundStudent;

  try {
    foundStudent = await Student.findById(studentId);
  } catch (err) {
    return (next(new HttpError("couldn't find the student..."), 404));
  }

  if (!foundStudent) {
    const error = new HttpError(
      'Could not find a student for the provided id.',
      404
    );
    return next(error);
  }

  
  res.json({ student: foundStudent.toObject({ getters: true }) });


};


const getStudentsByBranch = async (req, res, next) => {

  const bName = req.params.bName;
  let foundStudents;
  let branchStudents;

  try {
    foundStudents = await Student.find({});
  } catch (err) {
    return (next(new HttpError("couldn't find the stduents..."), 404));
  }

  if (!foundStudents || foundStudents.length === +0) {
    const error = new HttpError(
      'Could not find a student for the provided branch.',
      404
    );
    return next(error);
  }

  branchStudents = foundStudents.filter(fS => {
    if(fS.branch.toString() === bName.toString()){
      return true;
    }
    return false;
  })
  // console.log(branchStudents);
  
  res.json({ students:branchStudents.map(bS=>{
    return bS.toObject({getters:true});
  }) });


};

const getStudentsByCompanyName = async (req, res, next) => {

  const cName = req.params.cName;
  let foundStudents;
  let companyStudents;

  try {
    foundStudents = await Student.find({});
  } catch (err) {
    return (next(new HttpError("couldn't find the place..."), 404));
  }

  if (!foundStudents) {
    const error = new HttpError(
      'Could not find a student for the provided company name.',
      404
    );
    return next(error);
  }
  
  companyStudents = foundStudents.filter(fS => {
    if(fS.company.toString() === cName.toString()){
      return true;
    }
    return false;
  })
  if (!companyStudents || companyStudents.length === +0) {
    const error = new HttpError(
      'No Students Found for the provided company name',
      404
    );
    return next(error);
  }
  // console.log(com panyStudents);
  
  res.json({ students:companyStudents.map(cS=>{
    return cS.toObject({getters:true});
  }) });


};


exports.getAllStudents = getAllStudents;
exports.getStudentById = getStudentById;
exports.getStudentsByBranch = getStudentsByBranch;
exports.getStudentsByCompanyName = getStudentsByCompanyName;
