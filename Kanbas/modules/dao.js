import model from "./model.js";
export const createModule = (cid, module) => {
  delete module._id;
  module.id = new Date().getTime().toString();
  module.course = cid;
  return model.create(module);
};
export const findAllModulesForCourse = (courseId) => model.find({ course: courseId });
export const findModuleById = (moduleId) => model.findOne({ id  : moduleId });
export const updateModule = (moduleId, module) => model.updateOne({ _id: moduleId }, { $set: module });
export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });
