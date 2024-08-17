
import Guild from '../models/Guild';
import User from '../models/User';

const MAX_GUILD_MEMBERS = 50;

export const createGuild = async (name: string, founderId: string) => {
  const founder = await User.findById(founderId);
  if (!founder) {
    throw new Error('Founder not found');
  }

  const guild = new Guild({
    name,
    founder: founderId,
    members: [founderId]
  });

  await guild.save();
  founder.guild = guild._id;
  await founder.save();

  return guild;
};

export const joinGuild = async (userId: string, guildId: string) => {
  const guild = await Guild.findById(guildId);
  if (!guild) {
    throw new Error('Guild not found');
  }

  if (guild.members.length >= MAX_GUILD_MEMBERS) {
    throw new Error('Guild is full');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.guild) {
    throw new Error('User is already in a guild');
  }

  guild.members.push(userId);
  await guild.save();

  user.guild = guild._id;
  await user.save();

  return guild;
};