import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

type TProperty = "body" | "header" | "params" | "query";
type TAllSchemas = Record<TProperty, yup.Schema<any>>;

type TValidation = (schema: Partial<TAllSchemas>) => RequestHandler;

export const validation: TValidation = (schemas) => async (req, res, next) => {
  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validate(req[key as TProperty], { abortEarly: false });
      return next();
    } catch (err) {
      const yupError = err as yup.ValidationError;
      const errors: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (error.path === undefined) return;
        errors[error.path] = error.message;
      });
      return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
  });
};
