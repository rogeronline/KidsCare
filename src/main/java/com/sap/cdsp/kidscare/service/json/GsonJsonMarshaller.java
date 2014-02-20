package com.sap.cdsp.kidscare.service.json;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class GsonJsonMarshaller implements JsonMarshaller {

	public Gson gson;

	private LinerExclusionStrategy exclusionStrategy;

	private GsonBuilder builder;

	public GsonJsonMarshaller() {
		exclusionStrategy = new LinerExclusionStrategy();
		builder = new GsonBuilder().setDateFormat("yyyy-MM-dd").setExclusionStrategies(exclusionStrategy);
	}

	public void serializeNull(boolean serializeNull) {
		if (serializeNull) {
			builder.serializeNulls();
		}
	}

	protected synchronized void initGson() {
		if (gson == null) {
			gson = builder.setPrettyPrinting().create();
		}
	}

	@Override
	public String toJson(Object obj) {
		initGson();
		return gson.toJson(obj);
	}

	public void addSkipClasses(Class<?>... types) {
		if (types != null) {
			for (Class<?> type : types) {
				exclusionStrategy.addTypeToSkip(type);
			}
		}
	}

	static class LinerExclusionStrategy implements ExclusionStrategy {

		private final List<Class<?>> typesToSkip = new ArrayList<Class<?>>();

		public void addTypeToSkip(Class<?> type) {
			typesToSkip.add(type);
		}

		@Override
		public boolean shouldSkipField(FieldAttributes f) {
			return f.getAnnotation(JsonIgnore.class) != null;
		}

		@Override
		public boolean shouldSkipClass(Class<?> clazz) {
			return typesToSkip.contains(clazz);
		}

	}
}
