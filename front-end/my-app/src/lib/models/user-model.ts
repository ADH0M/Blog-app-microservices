import mongoose, { Document, models, Schema, Types, Model } from "mongoose";
import bcrypt from "bcrypt";

// Define role type
type UserRole = "admin" | "customer" | "super-admin";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: UserRole[];
  active: boolean;
  wishlist: Types.ObjectId[];
  comparePassword(password: string): Promise<boolean>;
  hasRole(role: string): boolean;
}

interface IUserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}

const userSchema = new Schema<IUser, IUserModel>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [2, "Username must be at least 2 characters"],
      maxlength: [50, "Username cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: "Please enter a valid phone number",
      },
    },
    role: {
      type: [String],
      enum: ["admin", "customer", "super-admin"],
      default: ["customer"],
    },
    active: { type: Boolean, default: true },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },

  }
);

// Indexes
userSchema.index({ role: 1 });
userSchema.index({ active: 1 });

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(14);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Check role
userSchema.methods.hasRole = function (role: string): boolean {
  return this.role.includes(role);
};

// Static method to find by email
userSchema.statics.findByEmail = function (
  email: string
): Promise<IUser | null> {
  return this.findOne({ email }).exec(); // 👈 .exec() for proper promise
};

const User =
  models.User || mongoose.model<IUser, IUserModel>("User", userSchema);
export default User;
