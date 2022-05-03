const dashboard_query = {
    count_data : `SELECT COUNT(*) cnt, 'Байгууллага' name FROM org
    UNION ALL
    SELECT COUNT(*) cnt, 'Санал асуулга' name FROM survey c
    UNION ALL 
    SELECT COUNT(*) cnt, 'Хэрэглэгч' name FROM systemuser 
    UNION ALL 
    SELECT 
    COUNT(*) cnt, 'Идэвхитэй санал асуулга' name FROM survey c WHERE c.status = 'Идэвхитэй'`,
    question_answer_stat : `SELECT answer, COUNT(*) FROM org_answer WHERE questionId = :p_questionId  GROUP BY answer`,
    question_answer_type : `SELECT at.name FROM device_question dq LEFT JOIN answer_type at 
    ON dq.answerTypeId = at.id
    WHERE dq.id = :p_questionId`,
    device_question_multi_answer : `SELECT aa.answer_data FROM (
        SELECT oda.id, REPLACE(oda.answer, ' ', '') answer_data, oda.questionId FROM org_device_answer oda
            LEFT JOIN(SELECT ww.id, at.name FROM  device_question ww LEFT JOIN answer_type at 
              ON at.id = ww.answerTypeId) dq
            ON oda.questionId = dq.id
            LEFT JOIN device_question_answer dqa
            ON oda.answer = dqa.id
         WHERE oda.questionId = :p_questionId) aa`,
    device_question_multi_answer_detail : `   SELECT GROUP_CONCAT(answer) answers   FROM device_question_answer  qa 
    WHERE qa.id IN (:p_data);`,
    device_normal_question_stat : `SELECT answer, COUNT(*) cnt FROM org_device_answer oda WHERE questionId = :p_questionId  GROUP BY answer`

}

const util_query = {
    userSurveyOrgId : `SELECT uso.id FROM user_survey_org uso
    inner JOIN (SELECT id FROM user_survey us WHERE surveyId = :p_surveyId) su
    ON uso.userSurveyId = su.id AND uso.orgId = :p_orgId AND su.id is NOT NULL LIMIT 1`


}


module.exports.dashboard_query = dashboard_query;
module.exports.util_query = util_query;

