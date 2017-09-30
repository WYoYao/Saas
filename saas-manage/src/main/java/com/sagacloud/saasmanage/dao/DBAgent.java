package com.sagacloud.saasmanage.dao;

import org.apache.hadoop.conf.Configuration;

import com.zillion.database.agent.ZillionAgent;

public class DBAgent {
	public static ZillionAgent agent;

	public static ZillionAgent GetAgent() {
		if (agent == null) {
			try {
				// Configuration configuration = HBaseConfiguration.create();
				Configuration configuration = new Configuration();
				configuration.set("hbase.cluster.distributed", "true");
				configuration.set("hbase.zookeeper.quorum", "zookeeper1,zookeeper2,zookeeper3");
				String zookeeper_connectionAddress = "zookeeper1:2181,zookeeper2:2181,zookeeper3:2181";
				int zookeeper_sessionTimeout = 30000;
				DBAgent.agent = new ZillionAgent(configuration, zookeeper_connectionAddress, zookeeper_sessionTimeout,"saas-manage");
				DBAgent.agent.Start();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return agent;
	}
}
