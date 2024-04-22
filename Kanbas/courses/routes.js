import * as dao from "./dao.js";
export default function CourseRoutes(app) {
  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.send(course);
  });
  app.delete("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const status = await dao.deleteCourse(id);
    res.json(status);
  });
  app.put("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const newCourse = req.body;
    const course = await dao.updateCourse(id, newCourse);
    res.json(course);
  });

  app.get("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const course = await dao.findCourseById(id);
    if (!course) {
      res.status(404).json({ message: `Unable to find course with ID ${id}` });
      return;
    }
    res.json(course);
  });

  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
}
