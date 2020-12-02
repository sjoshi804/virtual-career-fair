import express = require('express');
import { MeetingNotes } from './meetingNotes';
const MeetingNotesRouter = express.Router();

// Prefix: /meetingnotes

// Create meeting note
MeetingNotesRouter.post("/", async (req, res) =>
{
    var meetingNote = new MeetingNotes(req.body.recruiterId, req.body.applicantId, req.body.companyId, req.body.careerFairId, req.body.notes);
    res.send( { success: await MeetingNotes.db.save(meetingNote)});
});

// Get all notes for company
MeetingNotesRouter.get("/company/:companyId", async(req, res) =>
{
    res.send(await MeetingNotes.db.findMany({
        companyId: req.params.companyId
    }));
});

// Get all notes for company, applicant
MeetingNotesRouter.get("/company/:companyId/applicant/:applicantId", async(req, res) =>
{
    res.send(await MeetingNotes.db.findMany({
        companyId: req.params.companyId,
        applicantId: req.params.applicantId
    }));
});

// Get all notes for company, career fair
MeetingNotesRouter.get("/company/:companyId/careerfair/:careerFairId", async(req, res) =>
{
    res.send(await MeetingNotes.db.findMany({
        companyId: req.params.companyId,
        careerFairId: req.params.careerFairId
    }));
});

// Get specific note
MeetingNotesRouter.get("/company/:companyId/careerfair/:careerFairId/applicant/:applicantId", async(req, res) =>
{
    res.send(await MeetingNotes.db.findOne({
        applicantId: req.params.applicantId,
        companyId: req.params.companyId,
        careerFairId: req.params.careerFairId
    }));
});

// Update note
MeetingNotesRouter.patch("/company/:companyId/careerfair/:careerFairId/applicant/:applicantId", async(req, res) =>
{
    if (req.body.applicantId != undefined || req.body.careerFairId != undefined || req.body.companyId != undefined)
    {
        res.send(
        {
            success: false,
            message: "Cannot update this. Can only update notes field."
        })
    }
    else
    {
        res.send(
        {
            success: 
            await MeetingNotes.db.updateOne(
                {
                    applicantId: req.params.applicantId,
                    companyId: req.params.companyId,
                    careerFairId: req.params.careerFairId
                },
                {
                    $set:
                    {
                        notes: req.body.notes
                    }
                }
            )
        });
    }
});

// Delete specific note
MeetingNotesRouter.delete("/company/:companyId/careerfair/:careerFairId/applicant/:applicantId", async(req, res) =>
{
    res.send(
    {
        success:
        await MeetingNotes.db.deleteOne(
            {
                applicantId: req.params.applicantId,
                companyId: req.params.companyId,
                careerFairId: req.params.careerFairId
            }
        )
    });
});


export { MeetingNotesRouter };