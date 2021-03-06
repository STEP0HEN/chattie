const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers

const channelMembersController = require('../controllers/channel-members.controller');
/**
 * @swagger
 * /channel-members/common-channels:
 *  get:
 *    summary: check which channels have provided users in commone
 *    description:
 *      Take an array of users and return the common channels' ids are they member of
 *    produces: application/json
 *    parameters:
 *      - in: query
 *        name: users
 *        description: Array of users Ids.
 *        required: true
 *        schema:
 *          type: array
 *          items:
 *             type: integer
 *
 *    responses:
 *      201:
 *        description: Ok
 *        content:
 *          application/json:
 *             schema:
 *               type : array
 *               items:
 *                  type : integers
 *      5XX:
 *        description: Unexpected error.
 */
router.get('/common-channels', (req, res) => {
  const { users } = req.query;
  const usersId = JSON.parse(users);
  channelMembersController
    .getCommonChannels(usersId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);

      res
        .status(400)
        .send('Bad request')
        .end();
    });
});

/**
 * @swagger
 * /channel-members/membersInfo:
 *  get:
 *    summary: Get channel members profile details by channel id
 *    description:
 *      Will return single user with a matching channel ID.
 *    produces: application/json
 *    parameters:
 *     - in: query
 *       name: channelId
 *       schema:
 *         type: string
 *         required: true
 *         description: channel id
 *
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */
router.get('/membersInfo', (req, res, next) => {
  channelMembersController
    .getChannelMembersByChannelId(req.query.channelId)
    .then((result) => res.json(result))
    .catch(next);
});

/**
 * @swagger
 * /channel-members/{ID}:
 *  delete:
 *    summary: Delete a channel member
 *    description:
 *      Will delete a channel member with a given ID.
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: ID
 *        description: ID of the channel member to delete.
 *    responses:
 *      200:
 *        description: channel member deleted
 *      5XX:
 *        description: Unexpected error.
 *      404:
 *        description: channel member ID doesn't exist.
 */
router.delete('/:id', (req, res) => {
  channelMembersController
    .deleteChannelMember(req.params.id, req)
    .then((result) => {
      // If result is equal to 0, then that means the channel member id does not exist
      if (result === 0) {
        res
          .status(404)
          .send('The channel member ID you provided does not exist.');
      } else {
        res.json({ success: true });
      }
    })
    .catch((error) => console.log(error));
});

/**
 * @swagger
 * /channel-members:
 *  post:
 *    summary: Create channel members
 *    description:
 *      Will create a channel member.
 *    produces: application/json
 *    parameters:
 *      - in: body
 *        name: channel-member
 *        description: creates a channel memeber.
 *        schema:
 *          type: object
 *          required:
 *            - channelId
 *            - userId
 *          properties:
 *           - channelId:
 *                type: integer
 *                required: true
 *                description: the id of the channel to add the user
 *           - userId:
 *                type: integer
 *                required: true
 *                description: the id of the user to add to the channel
 *    responses:
 *      201:
 *        description: channel-member created
 *      5XX:
 *        description: Unexpected error.
 *      400:
 *        description: Bad request.
 */
router.post('/', (req, res) => {
  channelMembersController
    .createChannelMember(req.body)
    .then((result) => res.json(result))
    .catch(() => {
      res
        .status(400)
        .send('Bad request')
        .end();
    });
});

/**
 *
 * @swagger
 * /channel-members/:
 *  get:
 *    summary: figure out which channels has specific user
 *    description:
 *      Take an array of users and return the common channels' ids are they member of
 *    produces: application/json
 *    parameters:
 *      - in: query
 *        name: memberIds
 *        description: Array of users Ids.
 *        required: true
 *        schema:
 *          ArrayOfInt:
 *           type: array
 *           items:
 *             type: integer
 *             format: int64
 *           example: [1, 2, 3]
 *
 *    responses:
 *      201:
 *        description: Ok
 *        content:
 *          application/json:
 *             schema:
 *               type : array
 *               items:
 *                  type : integers
 *      5XX:
 *        description: Unexpected error.
 */
router.get('/', (req, res) => {
  const { memberIds } = req.query;
  const arrUsers = memberIds
    .split(',')
    .map((id) => +id)
    .filter((id) => id >= 0);

  channelMembersController
    .checkForGeneralChannels(arrUsers)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);

      res
        .status(400)
        .send('Bad request')
        .end();
    });
});

/**
 * @swagger
 * /channel-members/{ID}:
 *  patch:
 *    summary: edit channel_members
 *    description:
 *      Will edit channel_members.
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: ID
 *        description: ID of the channel-member to patch.
 *      - in: body
 *        name: channel_members
 *        description: The channel_member to edit.
 *        schema:
 *          type: object
 *          properties:
 *            channelId:
 *              type: string
 *            userId:
 *              type: string
 *    responses:
 *      200:
 *        description: channel_member was patched.
 *      5XX:
 *        description: Unexpected error.
 *      400:
 *        description: Bad request.
 */
router.patch('/:id', (req, res) => {
  channelMembersController
    .editChannelMembers(req.params.id, req.body)
    .then((result) => {
      // If result is equal to 0, then that means the channel member id does not exist
      if (result === 0) {
        res.status(400).send(`channel ID '${req.params.id}' does not exist.`);
      } else {
        res.json({ success: true });
      }
    })
    .catch((error) => console.log(error));
});

module.exports = router;
