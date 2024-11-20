import Joi from "joi";

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .message(
      'First name must start with a capital letter and be in the correct format'
    ),
  middleName: Joi.string().trim().required().max(20),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[a-zA-Z0-9]*$/)
    .message('Last name must only contain alphanumeric characters'),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().trim().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.date().required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().trim().required(),
  emergencyContactNo: Joi.string().trim().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'O+',
    'O-',
    'AB+',
    'AB-'
  ),
  presentAddress: Joi.string().trim().required(),
  permanentAddress: Joi.string().trim().required(),
  guardian: guardianValidationSchema.required(),
  localGauardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string()
    .uri()
    .pattern(/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/),
  isActive: Joi.string().valid('active', 'block').default('active'),
});

export default studentValidationSchema
