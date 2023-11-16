/**
 * Error extended with stack trace
 */
export interface ErrorWithStack extends Error
{
    stack?: string;
}