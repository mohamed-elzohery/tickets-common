"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const adjustRes = (model) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let query;
    //  copy req query
    const reqQuery = Object.assign({}, req.query);
    //  Fields to delete
    const fieldsToDel = ['sort', 'select', 'page', 'limit'];
    //  fields to delete
    fieldsToDel.forEach(field => delete reqQuery[field]);
    //  create query string
    let queryStr = JSON.stringify(reqQuery);
    //  replace operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); //Stackoverflow.com
    //  Starting building our query
    //  find query
    query = model.find(JSON.parse(queryStr));
    //  select query
    if (req.query.select) {
        const fieldsToShow = req.query.select.split(',').join(' ');
        query = query.select(fieldsToShow);
    }
    //  sort query
    if (req.query.sort) {
        const sortByFields = req.query.sort.split(',').join(' ');
        query = query.sort(sortByFields);
    }
    //  Setting pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = yield model.countDocuments();
    query = query.skip(startIndex).limit(limit);
    // Executing query
    const results = yield query;
    // Pagination results
    const pagination = {};
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }
    res.adjustRes = {
        success: true,
        count: results.length,
        pagination,
        data: results
    };
    next();
});
module.exports = adjustRes;
