const EventEmitter = require('events');
const UrlModel = require('../models/url.model');
const {
  URL_MSG_ERR_NOTFOUND,
  URL_MSG_ERR_SERVER,
} = require('../http-msg/url.msg');
const rs = require('randomstring');

class UrlController extends EventEmitter {
  constructor() {
    super();
    this.namespace = '/url-shortener/controller/url';
    this.self = this;
  }

  async handleRedirect(req, reply) {
    try {
      const { slug } = req.params;
      const { redirect } = req.query;
      const entryExists = await UrlModel.hasEntryWithSlug(slug);
      if (!entryExists) {
        return reply.code(404).send({ ...URL_MSG_ERR_NOTFOUND, slug });
      }
      const redirectUrlData = await UrlModel.getUrlForRedirect(slug);
      if (redirect === false) {
        return reply.status(200).send(redirectUrlData);
      }
      return reply.redirect(redirectUrlData.originalUrl);
    } catch (error) {
      console.log(error)
      return reply.code(500).send(URL_MSG_ERR_SERVER);
    }
  }

  async handleGetUrl(req, reply) {
    try {
      const { q, offset, limit } = req.query;
      const urlData = await UrlModel.getUrls(q, offset, limit);
      if (urlData.length === 0) {
        return reply
          .code(404)
          .send({ ...URL_MSG_ERR_NOTFOUND, q, offset, limit });
      }
      return reply.code(200).send(urlData);
    } catch (error) {
      return reply.code(500).send(URL_MSG_ERR_SERVER);
    }
  }
  async handleCreateUrl(req, reply) {
    try {
      const { body: payload } = req;
      let shortUrl = '';
      let slug = '';
      let slugExists = true;
      while (slugExists) {
        slug = rs.generate({ length: 8, charset: 'alphanumeric' });
        shortUrl = `${process.env.API_DOMAIN}/r/${slug}`;
        slugExists = await UrlModel.hasEntryWithSlug(slug);
      }

      payload.slug = slug;
      payload.shortUrl = shortUrl;

      const createUrlData = await UrlModel.createUrl(payload);
      return reply.code(201).send(createUrlData);
    } catch (error) {
      return reply.code(500).send(URL_MSG_ERR_SERVER);
    }
  }

  async handleDeleteUrlById(req, reply) {
    try {
      let { id } = req.params;
      const entryExists = await UrlModel.hasEntryWithId(id);
      if (!entryExists) {
        return reply.code(404).send({ ...URL_MSG_ERR_NOTFOUND, id });
      }

      const deleteUrlData = await UrlModel.deleteUrlById(id);
      reply.code(200).send(deleteUrlData);
    } catch (error) {
      return reply.code(500).send(URL_MSG_ERR_SERVER);
    }
  }
}

module.exports = new UrlController();
