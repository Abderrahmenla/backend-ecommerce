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
exports.handleException = void 0;
const client_1 = require("@prisma/client");
const handleException = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        console.error(`Prisma Error: ${error.message}`);
        return res
            .status(500)
            .json({
            message: `Prisma Error: ${error.message}`,
            status: 500,
            error: error,
        });
    }
    if (error instanceof Error) {
        console.error(error.message);
    }
    else {
        console.error('An unknown error occurred');
        return res
            .status(500)
            .json({ message: 'An unknown error occurred', status: 500, error: error });
    }
    return res
        .status(500)
        .json({ message: error.message, status: 500, error: error });
});
exports.handleException = handleException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGVscGVycy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBdUM7QUFHaEMsTUFBTSxlQUFlLEdBQUcsQ0FDN0IsS0FBWSxFQUNaLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0IsRUFDbEIsRUFBRTtJQUNGLElBQUksS0FBSyxZQUFZLGVBQU0sQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1FBQzFELE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQy9DLE9BQU8sR0FBRzthQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUM7WUFDSixPQUFPLEVBQUUsaUJBQWlCLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDekMsTUFBTSxFQUFFLEdBQUc7WUFDWCxLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDRCxJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUUsQ0FBQztRQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM5QixDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtRQUMxQyxPQUFPLEdBQUc7YUFDUCxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDOUUsQ0FBQztJQUNELE9BQU8sR0FBRztTQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0FBQ2hFLENBQUMsQ0FBQSxDQUFBO0FBM0JZLFFBQUEsZUFBZSxtQkEyQjNCIn0=