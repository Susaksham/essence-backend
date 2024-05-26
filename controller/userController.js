import User from "../model/UserModel.js";
/*

  localhost:3000/user/:id

  params : {

    "date":"02-08-2023",
    "timeSpent":30,
    "notified" : 0
}

  
 */
export const updateUserTime = async (req, res) => {
  const userId = req.params.id;

  const { timeSpent, notified, date } = req.body;
  try {
    console.log(userId);
    console.log("body", req.body);
    const user = await User.findById(userId);
    console.log(user);
    const statsArray = user.stats;
    const index = statsArray.findIndex((element) => {
      const alreadyStoredDate = new Date(element.date);
      const requiredDate = new Date(date);
      if (
        alreadyStoredDate.getMonth() === requiredDate.getMonth() &&
        alreadyStoredDate.getFullYear() === requiredDate.getFullYear() &&
        alreadyStoredDate.getDate() === requiredDate.getDate()
      ) {
        return true;
      } else {
        return false;
      }
    });
    console.log(index);
    if (index >= 0) {
      // update the previous stats for that day

      user.stats[index] = {
        date: user.stats[index].date,
        timeSpent: user.stats[index].timeSpent + timeSpent,
        notified: user.stats[index].notified + notified,
      };
    } else {
      // create new information for that date
      if (statsArray.length === 8) {
        statsArray.splice(0, 1);
      }
      const newArray = [...statsArray];
      newArray.push({
        date: date,
        timeSpent: +timeSpent,
        notified: +notified,
      });
      user.stats = newArray;
      console.log(newArray);
      console.log("created");
    }
    const goalIndex = user.goals.findIndex((element) => {
      return element.date === date;
    });

    if (goalIndex >= 0) {
      if (user.stats[index].timeSpent >= user.goals[goalIndex].target) {
        user.goals[goalIndex] = {
          acheived: true,
          date: user.goals[goalIndex].date,
          target: user.goals[goalIndex].target,
        };
      }
    }
    await user
      .save()
      .then((data) => {
        console.log("successfull saved the data: ", data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    res.status(200).json({ message: "Successfully saved the data", code: 1 });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const getUserStats = async (req, res) => {
  const userId = req.params.id;
  console.log("userId ", userId);
  try {
    const user = await User.findById(userId);
    console.log("user" + user);
    if (!user) {
      res.status(400).json({ message: "User Not found!", code: 0 });
    } else {
      res
        .status(200)
        .json({ stats: user.stats, code: 1, message: "Successfull" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, code: 0 });
  }
};
