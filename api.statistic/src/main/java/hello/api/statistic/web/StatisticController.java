package hello.api.statistic.web;

import hello.api.statistic.model.StatisticInfo;
import hello.api.statistic.service.StatisticService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api-statistic")
public class StatisticController {

    private static final Logger logger = LoggerFactory.getLogger(StatisticController.class);
    @Autowired
    private StatisticService statRepos;


    @GetMapping("/getAll{uuid}")
    public ResponseEntity<List<StatisticInfo>> findAll(@RequestParam UUID uuid) {
        try {
            List<StatisticInfo> stats = statRepos.findAllStatsByUUID(uuid);

            if (stats.isEmpty()) {
                return new ResponseEntity(HttpStatus.NO_CONTENT);
                // You many decide to return HttpStatus.NOT_FOUND
            } else {
                return new ResponseEntity<List<StatisticInfo>>(stats, HttpStatus.OK);
            }
        } catch (Exception e) {
            logger.error("getAllError", e);
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @GetMapping("/getWeek{uuid}")
    public ResponseEntity<List<StatisticInfo>> findWeek(@RequestParam UUID uuid) {
        try {
            List<StatisticInfo> stats = statRepos.findWeekStatsByUUID(uuid);

            if (stats.isEmpty()) {
                return new ResponseEntity(HttpStatus.NO_CONTENT);
                // You many decide to return HttpStatus.NOT_FOUND
            } else {
                return new ResponseEntity<List<StatisticInfo>>(stats, HttpStatus.OK);
            }
        } catch (Exception e) {
            logger.error("getWeekError", e);
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/getMonth{uuid}")
    public ResponseEntity<List<StatisticInfo>> findMonth(@RequestParam UUID uuid) {
        try {
            List<StatisticInfo> stats = statRepos.findMonthStatsByUUID(uuid);

            if (stats.isEmpty()) {
                return new ResponseEntity(HttpStatus.NO_CONTENT);
                // You many decide to return HttpStatus.NOT_FOUND
            } else {
                return new ResponseEntity<List<StatisticInfo>>(stats, HttpStatus.OK);
            }
        } catch (Exception e) {
            logger.error("getMonthError", e);
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @PostMapping("/create")
    public ResponseEntity createStat(@RequestBody Map<String, String> info) {
        try {
            statRepos.createStatistic(UUID.fromString(info.get("uid")), info.get("vk"));
            return new ResponseEntity(HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("create", e);
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get{vk}{uuid}")
    public ResponseEntity<StatisticInfo> getStat(@RequestParam String vk, @RequestParam UUID uuid) {
        try {

            return new ResponseEntity(statRepos.refreshStatistic(uuid, vk), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("getError", e);
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete{uuid}")
    public ResponseEntity deleteStats(@RequestParam UUID uuid) {

        try {
            statRepos.deleteStats(uuid);

            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            logger.error("deleteError", e);
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
