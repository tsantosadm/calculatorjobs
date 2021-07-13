const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() });
  },

  update(req, res) {
    //req.body para pegar os dados
    const data = req.body;

    //definir quantas semanas tem o ano: 52
    const weeksPerYear = 52;
    // remover as semanas de férias do ano,
    const weekPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    //para pegar quantas semanas tem 1 Mês

    // total de horas ou quantas horas por semana estou trabalhando
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    //horas trabalhadas no Mês
    const monthlyTotalHours = weekTotalHours * weekPerMonth;

    //qual vai ser o valor da minha hora por trabalho
    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour,
    });
    return res.redirect("/profile");
  },
};
