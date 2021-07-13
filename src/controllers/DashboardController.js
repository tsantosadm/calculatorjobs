const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();
    const statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    //total de horas por dia para cada Job
    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      //ajustes no Job

      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      //somar quantidade de status
      statusCount[status] += 1;

      //total de houras por dia de cada job
      jobTotalHours =
        status == "progress"
          ? jobTotalHours + Number(job["daily-hours"])
          : jobTotalHours;

      if (status == "progress") {
        jobTotalHours += Number(job["daily-hours"]);
      }

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
